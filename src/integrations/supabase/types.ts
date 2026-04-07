export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      export_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          file_url: string | null
          id: string
          live_match_id: string | null
          profile_id: string
          row_count: number | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          live_match_id?: string | null
          profile_id: string
          row_count?: number | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          live_match_id?: string | null
          profile_id?: string
          row_count?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "export_sessions_live_match_id_fkey"
            columns: ["live_match_id"]
            isOneToOne: false
            referencedRelation: "live_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "export_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_matches: {
        Row: {
          created_at: string
          game_id: number
          game_length: number | null
          game_mode: string | null
          game_queue_config_id: number | null
          game_start_time: number | null
          game_type: string | null
          id: string
          last_updated_at: string
          platform_id: string
          raw_data: Json
        }
        Insert: {
          created_at?: string
          game_id: number
          game_length?: number | null
          game_mode?: string | null
          game_queue_config_id?: number | null
          game_start_time?: number | null
          game_type?: string | null
          id?: string
          last_updated_at?: string
          platform_id: string
          raw_data: Json
        }
        Update: {
          created_at?: string
          game_id?: number
          game_length?: number | null
          game_mode?: string | null
          game_queue_config_id?: number | null
          game_start_time?: number | null
          game_type?: string | null
          id?: string
          last_updated_at?: string
          platform_id?: string
          raw_data?: Json
        }
        Relationships: []
      }
      match_events: {
        Row: {
          assisting_puuids: Json | null
          created_at: string
          event_type: string
          extra_data: Json | null
          id: string
          killer_puuid: string | null
          live_match_id: string
          position_x: number | null
          position_y: number | null
          timestamp_ms: number
          victim_puuid: string | null
        }
        Insert: {
          assisting_puuids?: Json | null
          created_at?: string
          event_type: string
          extra_data?: Json | null
          id?: string
          killer_puuid?: string | null
          live_match_id: string
          position_x?: number | null
          position_y?: number | null
          timestamp_ms: number
          victim_puuid?: string | null
        }
        Update: {
          assisting_puuids?: Json | null
          created_at?: string
          event_type?: string
          extra_data?: Json | null
          id?: string
          killer_puuid?: string | null
          live_match_id?: string
          position_x?: number | null
          position_y?: number | null
          timestamp_ms?: number
          victim_puuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_events_live_match_id_fkey"
            columns: ["live_match_id"]
            isOneToOne: false
            referencedRelation: "live_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      match_history_cache: {
        Row: {
          assists: number | null
          cached_at: string
          champion_id: number | null
          champion_name: string | null
          cs: number | null
          deaths: number | null
          game_duration: number | null
          game_mode: string | null
          gold_earned: number | null
          id: string
          items: Json | null
          kills: number | null
          match_id: string
          played_at: string | null
          puuid: string
          raw_data: Json | null
          region: string
          vision_score: number | null
          win: boolean | null
        }
        Insert: {
          assists?: number | null
          cached_at?: string
          champion_id?: number | null
          champion_name?: string | null
          cs?: number | null
          deaths?: number | null
          game_duration?: number | null
          game_mode?: string | null
          gold_earned?: number | null
          id?: string
          items?: Json | null
          kills?: number | null
          match_id: string
          played_at?: string | null
          puuid: string
          raw_data?: Json | null
          region?: string
          vision_score?: number | null
          win?: boolean | null
        }
        Update: {
          assists?: number | null
          cached_at?: string
          champion_id?: number | null
          champion_name?: string | null
          cs?: number | null
          deaths?: number | null
          game_duration?: number | null
          game_mode?: string | null
          gold_earned?: number | null
          id?: string
          items?: Json | null
          kills?: number | null
          match_id?: string
          played_at?: string | null
          puuid?: string
          raw_data?: Json | null
          region?: string
          vision_score?: number | null
          win?: boolean | null
        }
        Relationships: []
      }
      match_participants: {
        Row: {
          assists: number
          champion_id: number
          champion_name: string | null
          created_at: string
          cs: number
          deaths: number
          gold_earned: number
          id: string
          is_bot: boolean
          items: Json
          kills: number
          live_match_id: string
          position: string | null
          puuid: string
          runes: Json
          snapshot_at: string
          spell1_id: number | null
          spell2_id: number | null
          summoner_name: string
          team_id: number
          vision_score: number
        }
        Insert: {
          assists?: number
          champion_id: number
          champion_name?: string | null
          created_at?: string
          cs?: number
          deaths?: number
          gold_earned?: number
          id?: string
          is_bot?: boolean
          items?: Json
          kills?: number
          live_match_id: string
          position?: string | null
          puuid: string
          runes?: Json
          snapshot_at?: string
          spell1_id?: number | null
          spell2_id?: number | null
          summoner_name: string
          team_id: number
          vision_score?: number
        }
        Update: {
          assists?: number
          champion_id?: number
          champion_name?: string | null
          created_at?: string
          cs?: number
          deaths?: number
          gold_earned?: number
          id?: string
          is_bot?: boolean
          items?: Json
          kills?: number
          live_match_id?: string
          position?: string | null
          puuid?: string
          runes?: Json
          snapshot_at?: string
          spell1_id?: number | null
          spell2_id?: number | null
          summoner_name?: string
          team_id?: number
          vision_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "match_participants_live_match_id_fkey"
            columns: ["live_match_id"]
            isOneToOne: false
            referencedRelation: "live_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          preferred_region: string
          riot_puuid: string | null
          riot_summoner_id: string | null
          theme: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id: string
          preferred_region?: string
          riot_puuid?: string | null
          riot_summoner_id?: string | null
          theme?: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          preferred_region?: string
          riot_puuid?: string | null
          riot_summoner_id?: string | null
          theme?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      summoners: {
        Row: {
          account_id: string | null
          created_at: string
          id: string
          last_fetched_at: string
          profile_icon_id: number | null
          puuid: string
          region: string
          summoner_id: string
          summoner_level: number | null
          summoner_name: string
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          id?: string
          last_fetched_at?: string
          profile_icon_id?: number | null
          puuid: string
          region?: string
          summoner_id: string
          summoner_level?: number | null
          summoner_name: string
        }
        Update: {
          account_id?: string | null
          created_at?: string
          id?: string
          last_fetched_at?: string
          profile_icon_id?: number | null
          puuid?: string
          region?: string
          summoner_id?: string
          summoner_level?: number | null
          summoner_name?: string
        }
        Relationships: []
      }
      watched_summoners: {
        Row: {
          created_at: string
          id: string
          nickname: string | null
          notify_baron: boolean
          notify_kills: boolean
          profile_id: string
          summoner_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nickname?: string | null
          notify_baron?: boolean
          notify_kills?: boolean
          profile_id: string
          summoner_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nickname?: string | null
          notify_baron?: boolean
          notify_kills?: boolean
          profile_id?: string
          summoner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watched_summoners_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watched_summoners_summoner_id_fkey"
            columns: ["summoner_id"]
            isOneToOne: false
            referencedRelation: "summoners"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
