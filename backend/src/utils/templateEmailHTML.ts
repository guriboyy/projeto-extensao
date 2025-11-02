export const templateEmailHTML = (nameUser: string, code: string) => {
    return `    
        <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Olá, ${ nameUser }</h1>
            
            <p class="text-gray-600 mb-4">Este é o seu código: <span class="font-semibold text-blue-500">${ code }</span></p>
            
            <p class="text-gray-600 mb-6">Atenção, o código expirará após 5 minutos</p>
            
            <div class="text-sm text-gray-500">
                <p>Atenciosamente,</p>
                <p>Porta Fraternidade</p>
            </div>
        </div>
    `;
}