import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { nombre, password } = await request.json();

    if (!nombre || nombre.trim().length < 2) {
      return NextResponse.json(
        { error: "El nombre debe tener al menos 2 caracteres" },
        { status: 400 }
      );
    }

    const updateData: { nombre: string; passwordHash?: string } = {
      nombre: nombre.trim(),
    };

    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "La contraseña debe tener al menos 6 caracteres" },
          { status: 400 }
        );
      }
      updateData.passwordHash = hashPassword(password);
    }

    await prisma.usuario.update({
      where: { id: session.id },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error actualizando perfil:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
