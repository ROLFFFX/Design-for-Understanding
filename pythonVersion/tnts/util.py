from PIL import Image
import math

def create_composite_tnt(number_of_tnts, output_size=(1600, 1280), tnt_path='C:/Users/cy295/Desktop/school 7/cs 485/ds2/Design-for-Understanding/pythonVersion/tnts/TNT.png'):
    tnt_image = Image.open(tnt_path)

    num_per_row = int(number_of_tnts**0.5)
    num_per_col = number_of_tnts // num_per_row + (number_of_tnts % num_per_row > 0)

    tnt_width = output_size[0] // num_per_row
    tnt_height = output_size[1] // num_per_col

    tnt_image = tnt_image.resize((tnt_width, tnt_height))
    composite_image = Image.new('RGBA', output_size)

    for i in range(num_per_row):
        for j in range(num_per_col):
            if i * num_per_row + j < number_of_tnts:
                composite_image.paste(tnt_image, (i * tnt_width, j * tnt_height))

    return composite_image


from PIL import Image, ImageSequence

def resize_gif(input_gif_path, output_gif_path, size):
    with Image.open(input_gif_path) as img:
        frames = []

        for frame in ImageSequence.Iterator(img):
            frame = frame.convert("RGBA")
            resized_frame = frame.resize(size, Image.Resampling.LANCZOS)  # Updated to use Resampling.LANCZOS
            frames.append(resized_frame)
        frames[0].save(output_gif_path, save_all=True, append_images=frames[1:], format="GIF", loop=0, transparency=0)


if __name__ == "__main__":
    a = [20, 200, 800, 1000, 2000, 4000, 10000, 20000, 50000]
    for number in a:
        composite_image = create_composite_tnt(number_of_tnts=number)
        composite_image.save(f'pythonVersion/tnts/tnt{number}.png')
    # input_gif = 'C:/Users/cy295/Desktop/school 7/cs 485/ds2/Design-for-Understanding/pythonVersion/tnts/exp.gif'
    # output_gif = 'C:/Users/cy295/Desktop/school 7/cs 485/ds2/Design-for-Understanding/pythonVersion/tnts/exp.gif'
    # new_size = (400, 320)  # Width, Height in pixels
    # resize_gif(input_gif, output_gif, new_size)