import sys
import os
from PIL import Image

def compress_image_to_target_size(input_path, output_path, target_size_kb):
    img = Image.open(input_path)

    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    quality = 95
    step = 2

    while quality > 5:
        img.save(output_path, format='JPEG', quality=quality, optimize=True)
        current_size_kb = os.path.getsize(output_path) / 1024
        print(f"Trying quality={quality}: {current_size_kb:.2f}KB")

        if current_size_kb <= target_size_kb:
            print(f"✅ Achieved target size: {current_size_kb:.2f}KB")
            break

        quality -= step
    else:
        print("❌ Could not reach target size with acceptable quality.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❗ Uso: python compress.py <caminho_da_imagem>")
        sys.exit(1)

    input_image = sys.argv[1]
    output_image = "comprimida_" + os.path.basename(input_image)
    target_size_kb = 1900  # 1.9MB

    compress_image_to_target_size(input_image, output_image, target_size_kb)
