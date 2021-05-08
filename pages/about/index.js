import YouTube from 'react-youtube';
import BasicCard from '../../components/BasicCard';

const About = () => {
    return (
        <div className="container mx-auto">
            <div class="flex justify-center items-center mt-4">
                <div class="text-center bg-blue-400">
                    <h1 class="text-3xl">Friday Team Compress Image</h1>
                    <p class="text-xl">Hâlen düzenlenmektedir.</p>
                </div>
            </div>

            <p className="text-center text-3xl">Yotube videolarımız:</p>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                   <BasicCard
                    title="Başlangıç Ekip Tanışması"
                    content="Düzen neyi nasıl yapmalıyız?"
                    videoId="ebzEumty-Jw"
                   />
                </div>

                <div>
                   <BasicCard
                    title="Başlangıç Ekip Tanışması"
                    content="Düzen neyi nasıl yapmalıyız?"
                    videoId="ebzEumty-Jw"
                   />
                </div>

                <div>
                  
                </div>

                <div>9</div>
            </div>
        </div>

    )
}

export default About;