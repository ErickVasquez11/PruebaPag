import axios from 'axios';
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const PostFrm = () => {
    // eslint-disable-next-line consistent-return
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const body = Object.fromEntries(formData.entries());

        if (body.title === '' || body.description === '') return alert('Llena el titulo y la descripcion');

        const res = await axios.post('http://localhost:5500/posts/create', { ...body, active: body.active === 'on' }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        console.log(res);
    }

    return (
    <form>
        <div class="w-full">
    <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div class="bg-gray-600 w-full shadow rounded p-8 sm:p-12 -mt-72">
            <p class="text-3xl font-bold leading-7 text-center text-white">Formulario Post</p>
            <form action="" method="post">
                <div class="md:flex items-center mt-8">
                    <div class="w-full  flex flex-col">
                        <label  class="font-semibold leading-none text-white">Titulo</label>
                        <input  class="placeholder-gray-500 ..." placeholder="Ingrese titulo" type="text" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200" />
                    </div>
                  </div>
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                        <label class="font-semibold leading-none text-white">Imagen</label>
                        <input class="placeholder-gray-500 ..." placeholder="Ingrese URL de la imagen" type="text" class="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"/>
                    </div>
                    
                </div>
                <div>
                    <div class="w-full flex flex-col mt-8">
                        <label class="font-semibold leading-none text-white">Descripcion</label>
                        <textarea class="placeholder-gray-500 ..." placeholder="Ingrese descripcion del post" type="text" class="h-40 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"></textarea>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full">
                    <button class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-900 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
    </form>
        
    );
};

export default PostFrm;