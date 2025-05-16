import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Home = () => {
    // 에러 발생 시 화면에 표시
    const [fetchError, setFetchError] = useState(null)
    // supabase 에서 데이터를 읽어와서 저장
    const [smoothies, setSmoothies] = useState(null)
    // 정렬
    const [orderBy, setOrderby] = useState('created_at')

    useEffect(()=>{

        const fetchSmoothies = async () => { // supabase 작업 
            const {data,error} = await supabase
            .from('smoothies')
            .select()
            .order(orderBy,{ascending:false});
            if(error){
                setFetchError('Could not fetch the smoothies');
                setSmoothies(null);
            }
            if(data){
                setSmoothies(data);
                setFetchError(null);
            }
        }

        fetchSmoothies();

    },[orderBy]);

    return(
        <div className="page home">
            {fetchError&&(<p>{fetchError}</p>)}
            {smoothies&&(
                <div className="smoothies">
                    <div className="order-by">
                        <p>Order by:</p>
                        <button onClick={()=>setOrderby('created_at')}>Time Create</button>
                        <button onClick={()=>setOrderby('title')}>Title</button>
                        <button onClick={()=>setOrderby('rating')}>Rating</button>
                    </div>
                    <div className="smoothie-grid">
                        {
                            smoothies.map(smoothie=>(
                                <div key={smoothie.id} className="smoothie-card">
                                    <h3>{smoothie.title}</h3>
                                    <p>Raiting: {smoothie.rating}</p>
                                    <p>{smoothie.method}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;