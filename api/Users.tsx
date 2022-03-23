export const Cesi = '10.176.129.120';
export const Maison = '192.168.1.12';

export interface IConnect {
    mail: string;
    mot_de_passe: string;
}

export const getData = async (userEmail: string, userPassword: string) => {
    await fetch(`http://${Cesi}:3000/api/connexion`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })
    .then(function (response){return response})
    .catch(err => console.error(err));
}
