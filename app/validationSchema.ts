import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, 'Se requiere ingresar un Título.').max(255),
    description: z.string().min(1, 'Se requiere ingresar una Descripción'),
})

export default createIssueSchema