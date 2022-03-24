import { Maison } from ".";

export const getPublication = async (setPublication: (json: any) => void) => {
    try {
      let response = await fetch(
        `http://${Maison}:3000/api/ressource`
      );
      const json = await response.json();
      return setPublication(json);
    } catch (error) {
      console.error(error);
    }
  };