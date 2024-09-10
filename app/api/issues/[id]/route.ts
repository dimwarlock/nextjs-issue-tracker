import authOptions from "@/app/auth/authOptions";
import {createIssueSchema, patchIssueSchema} from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}:{params:{id: string}}) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    return NextResponse.json(issue, {status: 200})
}

export async function PATCH(request: NextRequest, {params}:{params:{id: string}}) {
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({status: 401})

    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.format, {status: 400})

    const {assignedToUserId, title, description} = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({where: {id: assignedToUserId}})
        if (!user)
            return NextResponse.json({error: 'Usuario no valido'}, {status: 400})
    }

    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})
    if(!issue)
        return NextResponse.json('Issue not found.', {status: 404})

    const issueUpdated = await prisma.issue.update({
        where: {id: issue!.id}, 
        data: {
            title, 
            description,
            assignedToUserId
        }
    })

    return NextResponse.json(issueUpdated, {status: 200})
}

export async function DELETE(request: NextRequest, {params}:{params: {id: string}}) {
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({status: 401})

    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    if (!issue)
        return NextResponse.json('Invalid Issue', {status:400})

    await delay(2000)

    await prisma.issue.delete({where: {id: parseInt(params.id)}});

    return NextResponse.json('Issue eliminada.', {status: 200})
}