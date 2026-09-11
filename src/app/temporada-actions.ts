"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const COOKIE_NAME = "unistar_temporada";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function setTemporadaSelecionada(nome: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, nome, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });

  revalidatePath("/");
}

export async function limparTemporadaSelecionada() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  revalidatePath("/");
}