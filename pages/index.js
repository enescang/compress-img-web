import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const API_URL = "https://compres-img.herokuapp.com";
//const API_URL = "http://localhost:3310";

const Home = () => {

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [algorithm, setAlgorithm] = useState(null);
    const [fileExtension, setFileExtension] = useState(null);
    const [gifProps, setGifProps] = useState({ scale: 0 });
    const [pngProps, setPngProps] = useState({ algorithm: 'pngout', quality: 100 });
    const [statistics, setStatistics] = useState(null)

    const changeImage = async (event) => {
        const extension = event.target.files.item(0).name.split('.').pop();
        setFileExtension(extension.toLowerCase());
        setImage(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]))
    };

    const handleRequest = () => {
        console.log(image)
        if (image == null) {
            alert('Resim seçilmedi');
            return;
        }
        const type = image.type;
        let extension = type.split('/');
        extension = extension[extension.length - 1];
        if (extension.match(/xml/)) {
            extension = "svg";
        }

        extension = extension.toLowerCase();
        if (extension == 'gif') {
            return GIF_REQUEST();
        }

        if (extension == 'svg') {
            return SVG_REQUEST();
        }

        if (extension == 'png') {
            return PNG_REQUEST();
        }
    }

    const GIF_REQUEST = async () => {
        let formData = new FormData();
        formData.append('img', image);
        formData.append('scale', Number(gifProps.scale));

        const Request = await fetch(API_URL + "/gif",
            {
                body: formData,
                method: "post"
            });
        const result = await Request.json();
        if (Request.status != 200) {
            return alert('İstek başarısız erro');
        }
        setStatistics(result);
        alert(JSON.stringify(result))
    }

    const SVG_REQUEST = async () => {
        let formData = new FormData();
        formData.append('img', image);
        const Request = await fetch(API_URL + "/svg",
            {
                body: formData,
                method: "post"
            });
        const result = await Request.json();
        if (Request.status != 200) {
            return alert('İstek başarısız erro');
        }
        setStatistics(result);
        alert(JSON.stringify(result))
    }

    const PNG_REQUEST = async () => {
        let formData = new FormData();
        formData.append('img', image);
        formData.append('engine', pngProps.algorithm);
        formData.append('quality', pngProps.quality);
        const Request = await fetch(API_URL + "/png",
            {
                body: formData,
                method: "post"
            });
        const result = await Request.json();
        if (Request.status != 200) {
            return alert('İstek başarısız PNG');
        }
        setStatistics(result);
        alert(JSON.stringify(result))
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Friday Team Compress Image</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Friday Team <a href="https://nextjs.org">Resim Sıkıştırma</a>
                </h1>

                <p className={`text-2xl text-blue-600 p-2`}>
                    <a href="/about">
                  
                Hakkımızda Sayfamız
                    </a>
                    {/* <code className={styles.code}>---</code> */}
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                        directory=""
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg,svg+xml"
                        onChange={changeImage}
                    />
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleRequest}
                        >
                            BAŞLAT
                        </button>
                    </div>
                </div>

                <div className={styles.grid}>
                    {
                        fileExtension == 'gif' &&
                        <>
                            <div className="">
                                <div className="w-full" >
                                    <p>GIF için scale değeri seçiniz</p>
                                    <p>scale resmi boyutlandırmaya yaramaktadır</p>
                                    <p>Scale Değeri: {Number(gifProps.scale).toFixed(2)}</p>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        value={gifProps.scale}
                                        className={styles.slider}
                                        step="0.1"
                                        onChange={e => setGifProps({ scale: e.target.value })}
                                        id="myRange"></input>
                                </div>
                            </div>
                        </>
                    }
                    {
                        fileExtension == 'png' &&
                        <>
                            <div className="">
                                <div className="w-full" >
                                    <p>PNG için bir algoritma seçiniz</p>
                                    <select 
                                    name="png_algorithm" 
                                    class="px-10 py-3 rounded" 
                                    onChange={(e) => setPngProps({algorithm:e.target.value, quality:pngProps.quality})}>
                                        <option value="pngout">PNGOUT</option>
                                        <option value="pngcrush">PNGCRUSH</option>
                                        <option value="webp">PNG {"->"} WEBP</option>
                                    </select>

                                    {
                                        pngProps.algorithm == 'webp' &&
                                        <>
                                        <p>Resmin kalitesini 1-100 arasında bir değer olarak seçiniz</p>
                                            <p>quality Değeri: {Number(pngProps.quality).toFixed(2)}</p>
                                            <input
                                                type="range"
                                                min="1"
                                                max="100"
                                                value={pngProps.quality}
                                                className={styles.slider}
                                                step="1"
                                                onChange={e => setPngProps({ quality: e.target.value, algorithm:pngProps.algorithm })}
                                                id="myRange"></input>
                                        </>
                                    }
                                  
                                </div>
                            </div>
                        </>
                    } 
                </div>

                <div className={styles.grid}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <img src={imagePreview} />
                        </div>
                        {
                            statistics != null &&
                            <div>
                            <img 
                            alt="iki" 
                            onError="this.onerror=null; this.src='image.png'"
                            src={`${API_URL}/${statistics && statistics.statistics && statistics.statistics[0].path_out_new}`} />
                            </div> 
                        }
                      
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className="grid grid-cols-1 md:grid-cols-1">
                        <div>
                            <table class="table-fixed">
                                <thead>
                                    <tr>
                                        <th class="w-1/4 ...">İlk Boyut(kb)</th>
                                        <th class="w-1/4 ...">Sıkıştırma Sonrası Boyut(kb)</th>
                                        <th class="w-1/4 ...">Yüzde(%)</th>
                                        <th class="w-1/4 ...">Algoritma</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        statistics && statistics.statistics && statistics.statistics.map((e,i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{e.size_in}</td>
                                                    <td>{e.size_output}</td>
                                                    <td className="bg-blue-200">{e.percent}</td>
                                                    <td>{e.algorithm}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}


export default Home;