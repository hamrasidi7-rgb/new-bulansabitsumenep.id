import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

export default function ArticleImage({ src, alt, caption, credit }: ArticleImageProps) {
  const hasCaption = !!(caption || credit);

  return (
    <figure className="my-6 break-inside-avoid [column-span:all]">
      <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 640px"
        />
      </div>

      {hasCaption && (
        <figcaption className="mt-2 px-1 text-xs leading-relaxed text-[var(--muted)]">
          {caption && <span className="italic">{caption}</span>}
          {caption && credit && " "}
          {credit && `(Foto: ${credit})`}
        </figcaption>
      )}
    </figure>
  );
}
