import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() dto: CreateLeadDto, @Req() req) {
    return this.leadsService.create(dto, req.user.tenantId);
  }

  @Get()
  findAll(@Req() req) {
    return this.leadsService.findAll(req.user.tenantId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req,
  ) {
    return this.leadsService.updateStatus(id, req.user.tenantId, status);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateLeadDto>,
    @Req() req,
  ) {
    // Esse método chama o this.leadsService.update que já criamos no Service anteriormente
    return this.leadsService.update(id, dto, req.user.tenantId);
  }
}
