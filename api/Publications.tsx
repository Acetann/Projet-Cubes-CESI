import { Cesi, Maison, Alex } from ".";

export const getPublication = async (setUtilisateur: (json: any) => void) => {
    try {
      let response = await fetch(
        `http://${Cesi}:3000/api/utilisateurs`
      );
      const json = await response.json();
      return setUtilisateur(json);
    } catch (error) {
      console.error(error);
    }
  };