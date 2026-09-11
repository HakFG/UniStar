"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "./ToastProvider";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
}

export default function ImageUploadInput({
  name,
  label,
  defaultValue,
  required,
  placeholder,
}: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const { success, error: toastError } = useToast();

  const inputCls =
    "w-full rounded-lg bg-base/60 border border-white/10 focus:border-accent outline-none px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors";
  const labelCls =
    "block font-heading font-semibold text-xs uppercase tracking-wider text-text-secondary mb-1.5";

  return (
    <div>
      <label className={labelCls}>
        {label} {required && "*"}
      </label>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required={required}
          className={inputCls + " flex-1"}
          placeholder={placeholder ?? "https://... ou envie uma imagem"}
        />

        <div className="shrink-0">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const uploaded = res?.[0]?.url;
              if (uploaded) {
                setUrl(uploaded);
                success("Imagem enviada!", "A URL foi preenchida sozinha.");
              }
            }}
            onUploadError={(err) => {
              toastError("Não deu pra enviar", err.message);
            }}
            appearance={{
              button:
                "ut-ready:bg-accent ut-uploading:bg-accent/70 ut-ready:hover:bg-accent/90 rounded-full text-base font-heading font-semibold px-4 py-2 text-xs transition-colors h-full",
              allowedContent: "hidden",
            }}
          />
        </div>
      </div>

      {/* Preview */}
      {url && (
        <div className="mt-2 flex items-start gap-3">
          <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-white/10 bg-base/40 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-[10px] text-text-secondary hover:text-red-400 transition-colors mt-1"
          >
            ✕ Limpar
          </button>
        </div>
      )}
    </div>
  );
}