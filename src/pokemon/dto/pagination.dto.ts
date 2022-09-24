import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @IsNumber()
  @ApiPropertyOptional()
  limit?: number;
  
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiPropertyOptional()
  offset?: number;
}