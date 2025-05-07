import CoverflowCarousel from "../components/cardCarousal";
import { ExpandableCardDemo } from "../components/cards";
import { Sidebar } from "../components/SideBar";

function community (){
    return<><div className="flex"><Sidebar/>
    <div className="flex-col h-full  ml-10 "><div className="text-3xl font-medium mb-4 mt-2 text-cyan-900" >Explore latest Courses</div><CoverflowCarousel/>
    <ExpandableCardDemo/></div></div></>
}
export default community;