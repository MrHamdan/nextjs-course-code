import Head from 'next/head';
import {MongoClient} from 'mongodb';
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title:'A first Meetup',
//         image: 'https://source.unsplash.com/random',
//         address:'Some address 5, 12345 Some City',
//         description:'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title:'A Second Meetup',
//         image: 'https://source.unsplash.com/random',
//         address:'Some address 10, 12345 Some City',
//         description:'This is a second meetup!'
//     },
// ]
function HomePage(props){
    return <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse a huge list of highly active React meetups!" />
        </Head>
        <MeetupList meetups={props.meetups}/>
    </>
}
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     // fetch data from an API
//     return{
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps(){
    // fetch data from an API
        const client = await MongoClient.connect('mongodb+srv://admin:2jhfJkgkyjOrtsfA@cluster0.y5fcu.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find().toArray();
        client.close();
    return{
        props:{
            meetups: meetups.map(meetup=>({
            title:meetup.title,
            address:meetup.address,
            image:meetup.image,
            id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    };
}
export default HomePage;