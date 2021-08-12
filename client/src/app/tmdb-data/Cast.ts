export interface CastResponse {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  gender?: number;
  id?: number;
  name?: string;
  order?: number;
  profil_path?: string;
}

export interface CreditResponse {
  cast?: CastResponse[];
  crew?: any[];
  id?: number;
}
