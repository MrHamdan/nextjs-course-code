import NewMeetupForm from "../../components/meetups/NewMeetupForm";

// our-domain.com/new-meetup
function NewMeetupPage(){
    function addMeetupHandler(enteredMeetupData){
        console.log(enteredMeetupData);
    }
    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}
export default NewMeetupPage;