import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import createIssueSchema from '../../validationSchema'
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({status: 401})

    const body = await request.json();

    const validation = createIssueSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const issue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(issue, {status: 201})
}

export async function GET() {
    const issues = await prisma.issue.findMany();

    return NextResponse.json(issues, {status: 200})
}