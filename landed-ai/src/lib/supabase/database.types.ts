export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      analysis_cost_items: {
        Row: {
          allocation: string;
          amount: number;
          analysis_id: string;
          category: string;
          created_at: string;
          currency: string;
          id: string;
          label: string;
          rate_to_ngn: number;
          sort_order: number;
          source_reference: string | null;
          updated_at: string;
          user_id: string;
          verification_status: string;
        };
        Insert: {
          allocation?: string;
          amount: number;
          analysis_id: string;
          category: string;
          created_at?: string;
          currency: string;
          id?: string;
          label: string;
          rate_to_ngn: number;
          sort_order?: number;
          source_reference?: string | null;
          updated_at?: string;
          user_id: string;
          verification_status?: string;
        };
        Update: {
          allocation?: string;
          amount?: number;
          analysis_id?: string;
          category?: string;
          created_at?: string;
          currency?: string;
          id?: string;
          label?: string;
          rate_to_ngn?: number;
          sort_order?: number;
          source_reference?: string | null;
          updated_at?: string;
          user_id?: string;
          verification_status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_cost_items_analysis_id_user_id_fkey";
            columns: ["analysis_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "import_analyses";
            referencedColumns: ["id", "user_id"];
          },
        ];
      };
      analysis_scenarios: {
        Row: {
          analysis_id: string;
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          overrides: NonNullable<Json>;
          results: Json | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          analysis_id: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          name: string;
          overrides?: NonNullable<Json>;
          results?: Json | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          analysis_id?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          overrides?: NonNullable<Json>;
          results?: Json | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "analysis_scenarios_analysis_id_user_id_fkey";
            columns: ["analysis_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "import_analyses";
            referencedColumns: ["id", "user_id"];
          },
        ];
      };
      import_analyses: {
        Row: {
          cost_per_unit_ngn: number | null;
          created_at: string;
          destination_city: string | null;
          destination_country: string;
          gross_margin_pct: number | null;
          gross_profit_ngn: number | null;
          id: string;
          name: string;
          product_description: string | null;
          product_name: string;
          quantity: number;
          rate_provider_name: string | null;
          rate_source: string;
          rates_as_of: string | null;
          revenue_ngn: number | null;
          selling_currency: string;
          selling_price_per_unit: number;
          selling_rate_to_ngn: number;
          supplier_currency: string;
          supplier_rate_to_ngn: number;
          supplier_unit_price: number;
          total_landed_cost_ngn: number | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          cost_per_unit_ngn?: number | null;
          created_at?: string;
          destination_city?: string | null;
          destination_country?: string;
          gross_margin_pct?: number | null;
          gross_profit_ngn?: number | null;
          id?: string;
          name: string;
          product_description?: string | null;
          product_name: string;
          quantity: number;
          rate_provider_name?: string | null;
          rate_source?: string;
          rates_as_of?: string | null;
          revenue_ngn?: number | null;
          selling_currency: string;
          selling_price_per_unit: number;
          selling_rate_to_ngn: number;
          supplier_currency: string;
          supplier_rate_to_ngn: number;
          supplier_unit_price: number;
          total_landed_cost_ngn?: number | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          cost_per_unit_ngn?: number | null;
          created_at?: string;
          destination_city?: string | null;
          destination_country?: string;
          gross_margin_pct?: number | null;
          gross_profit_ngn?: number | null;
          id?: string;
          name?: string;
          product_description?: string | null;
          product_name?: string;
          quantity?: number;
          rate_provider_name?: string | null;
          rate_source?: string;
          rates_as_of?: string | null;
          revenue_ngn?: number | null;
          selling_currency?: string;
          selling_price_per_unit?: number;
          selling_rate_to_ngn?: number;
          supplier_currency?: string;
          supplier_rate_to_ngn?: number;
          supplier_unit_price?: number;
          total_landed_cost_ngn?: number | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "import_analyses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          business_name: string | null;
          created_at: string;
          default_city: string | null;
          full_name: string | null;
          id: string;
          updated_at: string;
        };
        Insert: {
          business_name?: string | null;
          created_at?: string;
          default_city?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string;
        };
        Update: {
          business_name?: string | null;
          created_at?: string;
          default_city?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
