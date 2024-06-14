import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GuildService } from "../../services/guild.service";
import './index.sass';

export default function ModalAddGuild({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const [form, setForm] = useState({
        guildName: "",
        description: ""
    });
    const [formError, setFormError] = useState({
        guildName: "",
        description: ""
    });

    const handleGuildNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length >= 3) {
            setFormError({
                ...formError,
                guildName: ""
            })
        }
        setForm({ ...form, guildName: e.target.value });
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length >= 8) {
            setFormError({
                ...formError,
                description: ""
            })
        }
        setForm({ ...form, description: e.target.value });
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const guildNameValid = form.guildName.trim().length >= 3;
        const descriptionValid = form.description.trim().length >= 3;

        if (!guildNameValid || !descriptionValid) {
            setFormError({
                guildName: guildNameValid ? "" : "Nome do servidor é obrigatório",
                description: descriptionValid ? "" : "Descrição é obrigatória"
            });
            return;
        }

        addGuildMutate.mutate(form);
    }

    const addGuildMutate = useMutation({
        mutationFn: GuildService.addGuild,
        onSuccess: () => {
            onSuccess();
            onClose();
        }
    });

    return (
        <div className="modal">
            <form className="modal-content" onSubmit={submitForm}>
                <h2>Adicionar servidor</h2>
                <div className="form-item">
                    <p>Qual será o nome do servidor ?</p>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={form.guildName}
                        onChange={handleGuildNameChange}
                        className={formError.guildName ? 'error' : ''}
                    />
                    <span className='form-error'>{formError.guildName}</span>
                </div>
                <div className="form-item">
                    <p>Descreva esse servidor:</p>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={form.description}
                        onChange={handleDescriptionChange}
                        className={formError.description ? 'error' : ''}
                    />
                    <span className='form-error'>{formError.description}</span>
                </div>
                <div className="footer">
                    <button className="close-button" type="button" onClick={() => onClose()}>Cancelar</button>
                    <button className="add-button" type="submit">Criar</button>
                </div>
            </form>
        </div>
    );
}
