import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const API_URL = "https://compres-img.herokuapp.com";

const Home = () => {

    const [image, setImage] = useState(null);
    const [algorithm, setAlgorithm] = useState(null);
    const [fileExtension, setFileExtension] = useState(null);
    const [gifProps, setGifProps] = useState({scale:0});

    const changeImage = async (event) => {
        const extension = event.target.files.item(0).name.split('.').pop();
        setFileExtension(extension.toLowerCase());
        setImage(event.target.files[0]);
    };

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

                <p className={styles.description}>
                    Bir algoritma ve resim seçiniz{' '}
                    <code className={styles.code}>---</code>
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <input
                        directory=""
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange={changeImage}
                    />
                    <div>
                        <select name="algorithm" class="px-4 py-3 rounded" onChange={(e) => setAlgorithm(e.target.value)}>
                            <option value="gif"></option>
                            <option >PNG</option>
                        </select>

                    </div>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={GIF_REQUEST}
                        >
                            Button
                        </button>
                    </div>
                </div>

                <div className={styles.grid}>
                    {
                        fileExtension == 'gif' &&
                        <>
                            <div className="m-3 w-full" >
                                <p>GIF için scale değeri seçiniz</p>
                                <p>scale resmi boyutlandırmaya yaramaktadır</p>
                                <p>Scale Değeri: {Number(gifProps.scale).toFixed(2)}</p>
                            </div>
                            <div>
                            <div className={styles.slidecontainer}>
                             <input 
                                type="range"
                                min="0"
                                max="1"
                                value={gifProps.scale}
                                className={styles.slider}
                                step="0.1"
                                onChange={e=>setGifProps({scale:e.target.value})}
                              id="myRange"></input>
                              </div>
                            </div>

                        </>
                    }
                </div>

                <div className={styles.grid}>
                    <p>burası result alanı</p>
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