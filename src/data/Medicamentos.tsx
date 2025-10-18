export interface Medicamento {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    destacado?: boolean;
}

export const medicamento : Medicamento[] = [
        {
            id: 1,
            nombre: "Paracetamol 500mg",
            descripcion: "Alivio rápido del dolor y fiebre. Caja de 16 comprimidos.",
            precio: 2990,
            imagen: "https://www.laboratoriochile.cl/wp-content/uploads/2015/11/Paracetamol_500MG_16C_BE_HD.jpg",
            destacado: true
        },
        {
            id: 2,
            nombre: "Vitamina C 1000mg",
            descripcion: "Refuerza tu sistema inmune. Frasco con 30 cápsulas.",
            precio: 5490,
            imagen: "https://farmaciajimenez.com/storage/products/redoxon-vitamina-c-30-comprimidos-efervescentes-naranja/redoxon-vitamina-c-30-compimidos-efervescentes-sabor-naranja-960.jpg",
            destacado: true
        },
        {
            id: 3,
            nombre: "Amoxicilina 500mg",
            descripcion: "Antibiotico",
            precio: 10950,
            imagen: "https://farmaciasdeldrsimicl.vtexassets.com/arquivos/ids/156942/BE0155.jpg?v=638012014700170000",
            destacado: false
        },
        {
            id: 4,
            nombre: "Ibuprofeno 400mg",
            descripcion: "Alivio del dolor y la inflamación. Caja de 20 comprimidos.",
            precio: 3990,
            imagen: "https://www.laboratoriochile.cl/wp-content/uploads/2019/03/Ibuprofeno_400MG_20C_BE_HD.jpg",
            destacado: true
        },
        {
            id: 5,
            nombre: "Omeprazol 20mg",
            descripcion: "Alivio de la acidez estomacal. Caja de 14 cápsulas.",
            precio: 7990,
            imagen: "https://www.laboratoriochile.cl/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2019/03/Omeprazol_20MG_60C_BE_HD.jpg.webp",
            destacado: false
        },
        {
            id: 6,
            nombre: "Loratadina 10mg",
            descripcion: "Alivio de alergias y síntomas nasales. Caja de 10 comprimidos.",
            precio: 4590,
            imagen: "https://www.laboratoriochile.cl/wp-content/uploads/2015/11/Loratadina_10MG_30C_BE.jpg",
            destacado: false
        }
    ];