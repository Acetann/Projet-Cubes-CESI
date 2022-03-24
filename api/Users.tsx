import { Maison } from ".";

export const getUsers = async (setUsers: (json: any) => void) => {
        try {
          let response = await fetch(
            `http://${Maison}:3000/api/utilisateur`
          );
          const json = await response.json();
          return setUsers(json);
        } catch (error) {
          console.error(error);
        }
      };
