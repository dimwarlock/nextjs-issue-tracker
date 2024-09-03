import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';

export async function GET(request: NextRequest, {params}:{params:{id: string}}) {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    return NextResponse.json(issue, {status: 200})
}

export async function PUT(request: NextRequest, {params}:{params:{id: string}}) {
    const body = await request.json();

    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})
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
    const issue = await prisma.issue.delete({where: {id: parseInt(params.id)}});

    return NextResponse.json('Issue eliminada.', {status: 200})
}