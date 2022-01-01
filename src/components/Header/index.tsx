import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'


interface HeaderProps {
    onOpenNewTransactionModal: () => void; 
    //Criou uma interface para passar como parametro uma função que ativa o modal
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {


    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}