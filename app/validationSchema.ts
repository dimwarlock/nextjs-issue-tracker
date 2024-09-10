import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Se requiere ingresar un Título.').max(255),
    description: z.string().min(1, 'Se requiere ingresar una Descripción'),
})

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Se requiere ingresar un Título.').max(255).optional(),
    description: z.string().min(1, 'Se requiere ingresar una Descripción').optional(),
    assignedToUserId: z.string().min(1, 'Se requiere Id de Usuario').max(255).optional().nullable()
})