import ListContainer from "@/src/modules/core/components/ListContainer";
import { Subject } from "@/src/modules/curriculum/entities/Subject";

const SubjectList = ({subjects}: {subjects: Subject[];}) => {
    return (
        <ListContainer>
            {subjects?.map((subject, index) => (
                <li
                    key={index}
                    className="flex justify-between p-2 hover:bg-gray-300"
                >
                    {subject.name}
                </li>
            ))}
        </ListContainer>
    );
};


export default SubjectList