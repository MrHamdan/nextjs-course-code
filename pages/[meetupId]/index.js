import Head from 'next/head';
import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props){
    return(
        <><Head>
        <title>{props.meetupdata.title}</title>
        <meta name="description" content={props.meetupdata.description} />
    </Head><MeetupDetail image={props.meetupdata.image} title={props.meetupdata.title} address={props.meetupdata.address} description={props.meetupdata.description}/></>
    );
}
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://admin:2jhfJkgkyjOrtsfA@cluster0.y5fcu.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find({},{_id: 1}).toArray();
    return{
        fallback: false,
        paths: meetups.map(meetup =>({params:{meetupId: meetup._id.toString()}}))
        
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://admin:2jhfJkgkyjOrtsfA@cluster0.y5fcu.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
        console.log(selectedMeetup);
        client.close();
    // fetch data from a single meetup
    return{
        props:{
            meetupdata: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        },
    };
}
export default MeetupDetails;