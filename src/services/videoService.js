import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ricllmcxzquhzivpglvg.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpY2xsbWN4enF1aHppdnBnbHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzcyMzMsImV4cCI6MTk4Mzk1MzIzM30.6qlS6FIzHH8ZKBfLOZRjsP05HnUz2EdVLZ-h6XFUc8M";
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos").select("*")
        }
    }
}
