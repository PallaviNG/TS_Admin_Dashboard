import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { getTemplateList } from '../../Service/templateService';
import preview_icon from "../../assets/images/buttonIcons/preview_template.png";

function FeedbackPopup(props) {
    // let templateForms = useSelector((state) => state.templateDetails.templateList);
    // let dispatch = useDispatch();

    let [initialValues, setInitialValues] = useState({
        template_id: undefined
    });
    let [templateOptions, setTemplateOptions] = useState([]);
    let [templateID, setTemplateID] = useState();

    useEffect(() => {
        getTemplateList("get-template-list").then((result) => {
            if (result === undefined) return false;
            console.log(result);
            let _templateList = result.templateList;
            // dispatch(saveAllTemplateDetailsAction)
            console.log(_templateList);

            templateOptions = [];
            setTemplateOptions([]);
            templateOptions.push({ value: 0, name: "-Select Template" });
            if (_templateList.length === 0)
                templateOptions.push({ value: undefined, name: "No Template Found" });
            else {
                _templateList.forEach(template => {
                    templateOptions.push({ value: template._id, name: template.template_title });
                });
            }
            setTemplateOptions([...templateOptions]);
        });

    }, []);

    let onChange = (event) => {
        setTemplateID(event.target.value);
    };
    return (
        <div className='fParentContainer'>
            <div className='feedbackPopupContainer'>
                <div className='feedbackHeading'><h4>FeedBack Modal</h4>
                    <div className='feedbackChild'>{props.children}</div>
                </div>
                <div className="flex justify-content-center align-items-center">
                    <Formik initialValues={initialValues}>
                        <Form>
                            <div className="pop-up-selector flex flex-direction-column justify-content-center align-items-center">
                                <Field
                                    name="template_id"
                                    as="select"
                                    title="Template Name"
                                    onChange={(e) => onChange(e)}
                                    value={templateID}
                                >
                                    {templateOptions.map((template, index) => (
                                        <option key={index} value={template.value}>
                                            {template.name}
                                        </option>
                                    ))}
                                </Field>
                                <div className='fPIcons mt-4'>
                                    <button className='mr-4' title='Preview Template'><img src={preview_icon} /></button>
                                    <button title='Share Template'><i className="fa font-size-x-large fa-share-square-o" aria-hidden="true"></i></button>
                                </div>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default FeedbackPopup
