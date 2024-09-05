import createIssueSchema from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}:{params:{id: string}}) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    return NextResponse.json(issue, {status: 200})
}

export async function PATCH(request: NextRequest, {params}:{params:{id: string}}) {
    const body = await request.json();

    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format, {status: 400})

    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})
    if(!issue)
        return NextResponse.json('Issue not found.', {status: 404})

    const issueUpdated = await prisma.issue.update({
        where: {id: issue!.id}, 
        data: {
            title: body.title, 
            description: body.description
        }
    })

    return NextResponse.json(issueUpdated, {status: 200})
}

export async function DELETE(request: NextRequest, {params}:{params: {id: string}}) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    if (!issue)
        return NextResponse.json('Invalid Issue', {status:400})

    await prisma.issue.delete({where: {id: parseInt(params.id)}});

    return NextResponse.json('Issue eliminada.', {status: 200})
}