export default function CheckboxesInfos() {
    return (
        <>
            <h2>Usage</h2>
            <p>
                Checkboxes allow multiple selection inside a set of one or more options. They can also be used as an on
                or off toggles with only one checkbox.
            </p>
            <h2>Guidelines</h2>
            <ul className="list-disc">
                <li>
                    Use a wording that indicates how much item the user can select. Some user may not know the
                    difference between checkboxes and radio buttons.
                </li>
                <li>
                    List options vertically; horizontal listings can make it difficult to tell which label is related to
                    which checkbox.
                </li>
                <li>Try to limit the size of the label to one line.</li>
                <li>Always put the most common options at the top of the list.</li>
                <li>
                    Only preselect options if there’s a strong, user-centred reason to. If you do it, select the value
                    that has the most chance to be chosen by the users.
                </li>
                <li>
                    Only reveal additional questions with the expanded zone, pointing to the value that is selected.
                </li>
                <li>
                    Partially selected state is used only to indicate that some sub-options are selected and some are
                    not.
                </li>
                <li>
                    Use positive statements. Negative language in labels can be counterintuitive. For example, use “I
                    want to receive a promotional email” instead of “I don’t want to receive promotional email.”
                </li>
            </ul>
            <h2>Accessibility</h2>
            <ul className="list-disc">
                <li>A set (multiple checkboxes) should have a title.</li>
                <li>
                    Surround a related set with a <code>&lt;fieldset&gt;</code>. Do not use{' '}
                    <code>&lt;fieldset&gt;</code> for a single checkbox.
                </li>
                <li>Both the checkbox and its label can be clicked to select the option.</li>
                <li>The control needs a larger hit areas on a touch devices.</li>
            </ul>
        </>
    );
}
