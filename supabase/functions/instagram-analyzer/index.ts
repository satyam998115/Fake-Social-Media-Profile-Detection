import { serve } from "npm:@deno/http-server";
import { Command } from "npm:@deno/command";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();
    
    if (!username) {
      throw new Error("Username is required");
    }

    // Run Python script
    const command = new Command("python3", ["analyze.py", username]);
    const { stdout, stderr } = await command.output();

    if (stderr.length > 0) {
      throw new Error(`Python script error: ${new TextDecoder().decode(stderr)}`);
    }

    const result = JSON.parse(new TextDecoder().decode(stdout));

    if (result.error) {
      throw new Error(result.error);
    }

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to analyze Instagram profile",
        status: "error" 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});