export function getAllUtilisateurs() {
    fetch('http://192.168.1.12:3001/api/utilisateur', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
});
}

export const Cesi = '10.176.129.120';
export const Maison = '192.168.1.12';