import { Share2, Twitter, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* WhatsApp */}
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          window.open(
            `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`
          )
        }
      >
        <Share2 className="h-4 w-4" />
      </Button>

      {/* Twitter */}
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(url)}`
          )
        }
      >
        <Twitter className="h-4 w-4" />
      </Button>

      {/* Copy Link */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert("Link disalin!");
        }}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}