import { useQuery } from "@tanstack/react-query"
import { GuildService } from "../../services/guild.service"
import { useNotification } from "../../contexts/notification.context"
import { ApiError } from "../../types/error"
import { useEffect, useState } from "react"
import SideBar from "../../components/side-bar"
import ModalAddGuild from "../../components/modal-add-guild"
import { useAuth } from "../../hooks/use-auth.hook"

export default function Home() {
    const { user } = useAuth()
    const { showNotification } = useNotification()
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGuild, setSelectedGuild] = useState<string | null>(null);

    const guildsQuery = useQuery({
        queryKey: ["getManyGuilds"],
        queryFn: async () => GuildService.getGuilds(),
    })

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        if (guildsQuery.isError) {
            const error = guildsQuery.error as ApiError
            const message = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message
            showNotification(message, 'error')
        }
    }, [guildsQuery.isError, guildsQuery.error])

    if (guildsQuery.isPending) {
        return <div>Loading...</div>
    }

    if (guildsQuery.isError) {
        return <div>Error</div>
    }

    return (
        <div>
            <SideBar guilds={guildsQuery.data} openModal={openModal} selectGuild={setSelectedGuild} />
            {modalOpen && <ModalAddGuild onClose={closeModal} onSuccess={() => {
                guildsQuery.refetch()
            }} />}
        </div>
    )
}