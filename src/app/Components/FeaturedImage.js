import Image from "next/image";
import Link from "next/link";

export default function FeaturedImage({ post }) {
  let img = "";

  const defaultFeaturedImage =
    "http://headless.local/wp-content/uploads/2022/12/hiking-backpack-900x600.jpg";
  const defaultWidth = "300";
  const defaultHeight = "200";

  if (post.featuredImage) {
    let size = post.featuredImage.node.mediaDetails.sizes[0];
    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
    };
  } else {
    img = {
      src: defaultFeaturedImage,
      width: defaultWidth,
      height: defaultHeight,
    };
  }
  return (
    <Link href={`/blog/${post.slug}`}>
      <Image
        src={img.src}
        alt={post.title}
        width={img.width}
        height={img.height} 
        className="h-full object-cover rounded-xl"
      />
    </Link>
  );
}
