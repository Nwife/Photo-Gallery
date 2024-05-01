export async function delay(timeout: number) {
  return new Promise((res, rej) => {
    try {
      setTimeout(() => {
        res("");
      }, timeout);
    } catch (err: any) {
      rej(err);
    }
  });
}

export function readFileAsDataURL(file: File) {
  return new Promise((res: (val: string) => void, rej) => {
    try {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        res(e?.target?.result as any as string);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      rej(err);
    }
  });
}

export function readDataURLAsFileSync(dataUri: string, name?: string) {
  try {
    let type = dataUri.split(";")[0].split(":")[1];
    let content = dataUri
      .split(";")[1]
      .split(",")
      ?.filter((i, idx) => idx !== 0)
      ?.join(",");
    let result = new File([content], name || new Date().toISOString(), {
      type: type,
    });
    return result;
  } catch (err) {
    console.log(err);
    return "";
  }
}

export function readDataURLAsFile(dataUri: string, name?: string) {
  return new Promise((res: (file: File) => void, rej) => {
    try {
      let type = dataUri.split(";")[0].split(":")[1];
      let content = dataUri
        .split(";")[1]
        .split(",")
        ?.filter((i, idx) => idx !== 0)
        ?.join(",");
      let result = new File([content], name || new Date().toISOString(), {
        type: type,
      });
      res(result);
    } catch (err) {
      rej(err);
    }
  });
}
