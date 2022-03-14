import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(){
    return(
        <MeetupDetail image='https://source.unsplash.com/random' title='First Meetup' address='Some Street 5, Some City' description='This is a first meetup'/>
    );
}
export async function getStaticPaths(){
    return{
        fallback: false,
        paths:[
            {params:{
                meetupId:'m1'
            }},
            {params:{
                meetupId:'m2'
            }},
        ]
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    console.log(meetupId);
    // fetch data from a single meetup
    return{
        props:{
            meetup: {
                image: 'https://source.unsplash.com/random',
                id:meetupId,
                title:'First Meetup',
                address:'Some Street 5, Some City',
                description:'This is a first meetup'
            },
        },
    };
}
export default MeetupDetails;