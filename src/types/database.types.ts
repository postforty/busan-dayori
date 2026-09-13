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
      daily_lessons: {
        Row: {
          created_at: string
          day_number: number | null
          dialogue: Json
          grammar: Json
          id: string
          key_expression: Json
          nuance_tip: string | null
          related_letter_id: string | null
          series_title: string
          theme_title: string
          vocabulary: Json
        }
        Insert: {
          created_at?: string
          day_number?: number | null
          dialogue: Json
          grammar: Json
          id: string
          key_expression: Json
          nuance_tip?: string | null
          related_letter_id?: string | null
          series_title: string
          theme_title: string
          vocabulary: Json
        }
        Update: {
          created_at?: string
          day_number?: number | null
          dialogue?: Json
          grammar?: Json
          id?: string
          key_expression?: Json
          nuance_tip?: string | null
          related_letter_id?: string | null
          series_title?: string
          theme_title?: string
          vocabulary?: Json
        }
        Relationships: [
          {
            foreignKeyName: "daily_lessons_related_letter_id_fkey"
            columns: ["related_letter_id"]
            isOneToOne: false
            referencedRelation: "letters"
            referencedColumns: ["id"]
          },
        ]
      }
      dialects: {
        Row: {
          created_at: string
          dialect: string
          example: string
          id: string
          japanese: string
          situation: string
          sort_order: number
          standard: string
        }
        Insert: {
          created_at?: string
          dialect: string
          example: string
          id: string
          japanese: string
          situation: string
          sort_order?: number
          standard: string
        }
        Update: {
          created_at?: string
          dialect?: string
          example?: string
          id?: string
          japanese?: string
          situation?: string
          sort_order?: number
          standard?: string
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          letter_id: string
          naturalness: string
          reader_name: string
          suggestion: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          letter_id: string
          naturalness: string
          reader_name?: string
          suggestion?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          letter_id?: string
          naturalness?: string
          reader_name?: string
          suggestion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_letter_id_fkey"
            columns: ["letter_id"]
            isOneToOne: false
            referencedRelation: "letters"
            referencedColumns: ["id"]
          },
        ]
      }
      letters: {
        Row: {
          category: string
          content: Json
          created_at: string
          date: string
          id: string
          image_url: string
          likes: number
          place_info: Json | null
          region: string
          study_point: Json
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: Json
          created_at?: string
          date: string
          id: string
          image_url: string
          likes?: number
          place_info?: Json | null
          region: string
          study_point: Json
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: Json
          created_at?: string
          date?: string
          id?: string
          image_url?: string
          likes?: number
          place_info?: Json | null
          region?: string
          study_point?: Json
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      phrases: {
        Row: {
          category: string
          created_at: string
          id: string
          japanese: string
          korean: string
          pronunciation: string
          sort_order: number
          tip: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id: string
          japanese: string
          korean: string
          pronunciation: string
          sort_order?: number
          tip?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          japanese?: string
          korean?: string
          pronunciation?: string
          sort_order?: number
          tip?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer: string | null
          author_name: string
          created_at: string
          id: string
          is_answered: boolean
          question: string
          target_month: string | null
          updated_at: string
        }
        Insert: {
          answer?: string | null
          author_name: string
          created_at?: string
          id?: string
          is_answered?: boolean
          question: string
          target_month?: string | null
          updated_at?: string
        }
        Update: {
          answer?: string | null
          author_name?: string
          created_at?: string
          id?: string
          is_answered?: boolean
          question?: string
          target_month?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_letter_likes: {
        Args: {
          target_letter_id: string
        }
        Returns: number
      }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
