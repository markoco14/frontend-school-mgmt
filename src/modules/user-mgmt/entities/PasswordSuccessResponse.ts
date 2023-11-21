export class PasswordSuccessResponse {
  constructor(
    public detail?: string,
    public current_password?: string,
  ) {}
}