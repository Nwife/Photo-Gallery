import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils"
import { Dispatch } from "react";
import { v4 } from "uuid";
import { allowedFormats } from "../components/upload";
import { delay, readFileAsDataURL } from "../functions";

export const loadingPicturesAtom = atom(false);

export const picturesAtom = atomWithStorage<Picture[]>("pictures", [
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "Car and bus near castle",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "Big Ben tower",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1517394834181-95ed159986c7?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1517394834181-95ed159986c7?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "Woman walking on street",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1534374950034-3644ddb72710?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1534374950034-3644ddb72710?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "High-rise buildings",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1500380804539-4e1e8c1e7118?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1500380804539-4e1e8c1e7118?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "Big Ben London during daytime",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1520967824495-b529aeba26df?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "Tower Bridge, London",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1448906654166-444d494666b3?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1448906654166-444d494666b3?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "St. Paul's Cathedral",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
  {
    id: v4(),
    src: "https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=320",
    srcSet:
      "https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=320&dpr=2 2x",
    name: "Aerial view photography of the city",
    location: "London, UK",
    tags: ["tag 1", "tag 2"],
  },
]);

export const picturesCountAtom = atom((get) => get(picturesAtom).length);

export const addingTagAtom = atom(false);

export const addTagAttom = atom(
  "",
  async (get, set, { id, tag }: { id: string; tag: string }) => {
    set(addingTagAtom, true);
    set(
      picturesAtom,
      get(picturesAtom)?.map((i) => {
        if (i?.id == id) {
          i.tags = [...(i?.tags || []), tag];
          return i;
        } else {
          return i;
        }
      })
    );
    set(addingTagAtom, false);
  }
);

export const removingTagAtom = atom(false);

export const removeTagAttom = atom(
  "",
  async (get, set, { id, tagIndex }: { id: string; tagIndex: number }) => {
    set(removingTagAtom, true);
    set(
      picturesAtom,
      get(picturesAtom)?.map((i) => {
        if (i?.id == id) {
          i.tags = [...(i?.tags || [])]?.filter((i, idx) => idx !== tagIndex);
          return i;
        } else {
          return i;
        }
      })
    );
    set(removingTagAtom, false);
  }
);

export const settingLocationAtom = atom(false);

export const setLocationAttom = atom(
  "",
  async (get, set, { id, value }: { id: string; value: string }) => {
    set(settingLocationAtom, true);
    set(
      picturesAtom,
      get(picturesAtom)?.map((i) => {
        if (i?.id == id) {
          i.location = value;
          return i;
        } else {
          return i;
        }
      })
    );
    set(settingLocationAtom, false);
  }
);

export const updatingPictureAttom = atom(false);

export const updatePictureAttom = atom(
  "",
  async (
    get,
    set,
    {
      id,
      value,
    }: {
      id: string;
      value: { name?: string; location?: string; tags?: string[] };
    }
  ) => {
    set(updatingPictureAttom, true);
    await delay(1000);
    set(
      picturesAtom,
      get(picturesAtom)?.map((i) => {
        if (i?.id == id) {
          if (value?.name) {
            i.name = value?.name;
          }

          if (value?.location) {
            i.location = value?.location;
          }

          if (value?.tags) {
            i.tags = value?.tags;
          }

          return i;
        } else {
          return i;
        }
      })
    );
    set(updatingPictureAttom, false);
  }
);

export const uploadingPictureAtom = atom<Record<string, number>>({});

export const uploadPictureErrorAtom = atom<Record<string, string>>({});

export const updloadPicturesAtom = atom(
  "",
  async (
    get,
    set,
    {
      files,
      setFiles,
    }: {
      files: File[];
      setFiles: Dispatch<File[]>;
    }
  ) => {
    let pictures = [...get(picturesAtom)];
    for (let file of files) {
      if (!allowedFormats.includes(file?.type)) {
        set(uploadPictureErrorAtom, {
          ...get(uploadPictureErrorAtom),
          [file?.name]: "Only JPEG, PNG, SVG, WEBP, JPG file formats allowed.",
        });
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 100,
        });
      } else if (file?.size > 10000000) {
        set(uploadPictureErrorAtom, {
          ...get(uploadPictureErrorAtom),
          [file?.name]: "Maximum file size of 10MB",
        });
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 100,
        });
      } else {
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 1,
        });
        await delay(1000);
        const id = v4();
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 25,
        });
        await delay(1000);
        const url = await readFileAsDataURL(file);
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 50,
        });
        await delay(1000);
        let picture: Picture = {
          id,
          name: file?.name?.split(".")?.[0],
          location: "London, UK",
          tags: [],
          src: url,
          srcSet: `${url} 2x`,
        };
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 75,
        });
        await delay(1000);
        pictures?.push(picture);
        set(uploadingPictureAtom, {
          ...get(uploadingPictureAtom),
          [file?.name]: 100,
        });
      }
    }
    set(picturesAtom, pictures);
  }
);

export const deletingPictureAtom = atom(false);

export const deletePictureAtom = atom("", async (get, set, id: string) => {
  set(deletingPictureAtom, true);
  set(
    picturesAtom,
    get(picturesAtom)?.filter((i) => i?.id !== id)
  );
  set(deletingPictureAtom, false);
});

//searching for a picture
export const searchAtom = atom("");

export const filteredPicturesAtom = atom((get) => {
  const search = get(searchAtom);
  const pictures = get(picturesAtom);
  if (!search) return pictures;
  return pictures.filter((picture) =>
    picture.name?.toLowerCase().includes(search?.toLowerCase())
  );
});

//sorting a picture
export const sortAtom = atom("asc");

export const sortedPicturesAtom = atom((get) => {
  const sort = get(sortAtom);
  const pictures = get(filteredPicturesAtom);
  if (sort === "asc") {
    return [...pictures].sort((a, b) => a.name.localeCompare(b.name));
  }
  return [...pictures].sort((a, b) => b.name.localeCompare(a.name));
});

export type Picture = {
  id: string;
  src: string;
  srcSet: string;
  name: string;
  location: string;
  tags?: string[];
};
