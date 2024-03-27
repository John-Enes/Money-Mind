import styles from "./Select.module.css";

function Select({ text, name, handleOnChange, options, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
                required // Adiciona o atributo 'required' para tornar o campo obrigatório
            >
                <option value="" disabled>Select an option</option> {/* Opção padrão desabilitada */}
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name ? option.name : 'No Name'}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;