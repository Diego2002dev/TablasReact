import React, { Fragment, useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider} from '@react-pdf/renderer';
import instancia from '../../../config/Instancia'
const Ticket = () => {
    
    const [datosFormulario, setDatosFormulario] = useState({
        nombre_empresa: "FPT Comps",
        direccion: "Nueva York",
        cif: "A12345678",
        articulo: "Champú",
        iva: "21%",
        precio: "6,99€",
        formaPago: "en metálico",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosFormulario(datosPrevios => ({
            ...datosPrevios,
            [name]: value.trimStart(),
        }));
    };

    const styles = StyleSheet.create({
        document: {
            width: 58,
            height: 200,
        },
        page: {
            flexDirection: 'column',
            backgroundColor: '#E4E4E4',
            padding: 10,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        header: {
            fontSize: 20,
            marginBottom: 10,
            textAlign: "center",
        },
        text: {
            fontSize: 9,
        },
    });

    // const handlePrint = () => {
    //     printJS({
    //       printable: "print-area",
    //       type: 'html',
    //     });
    //   };




    // const handlePrint = async () => {
    //     await instancia("print.php")
    //     .then( response => {
    //         console.log(response.data);
    //     })
    //     .catch( error => {
    //         console.log(error);
    //     })
    // }





    return (
        <>
            <label>
                Nombre de la empresa
                <input name="nombre_empresa" type="text" onChange={handleInputChange} value={datosFormulario.nombre_empresa} />
            </label>


            <BlobProvider id="print-area"
                document={
                    <Document>
                        <Page size={[58 * 2.83465, 200 * 2.83465]} style={styles.page}>
                            <View style={styles.section}>
                                <Text style={styles.header}>TICKET</Text>
                                <Text style={styles.text}>Empresa: {datosFormulario.nombre_empresa}</Text>
                                <Text style={styles.text}>Dirección: {datosFormulario.direccion}</Text>
                                <Text style={styles.text}>CIF: {datosFormulario.cif}</Text>
                                <Text style={styles.text}>Artículo: {datosFormulario.articulo}</Text>
                                <Text style={styles.text}>IVA: {datosFormulario.iva}</Text>
                                <Text style={styles.text}>Precio: {datosFormulario.precio}</Text>
                                <Text style={styles.text}>Forma de pago: {datosFormulario.formaPago}</Text>
                                
                            </View>
                        </Page>
                    </Document>
                }
            >
                {({ url, loading }) => (
                    loading ? "" :
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <button onClick={() => ""} type="button">Descargar PDF</button>
                        </a>
                )}
            </BlobProvider>
        </>
    );
};

export default Ticket;
