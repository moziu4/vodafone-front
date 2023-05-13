Feature: Login

    @skipLogin
    Scenario: I want to do login with user Jenita2
        Given I load Load Page
        When I write "jenita2" in input username
        And I write "12345" in input password
        And Click on Button Iniciar Session
        Then display message "Autenticando..."
        Then Se crea un token en LocalStorage

    @skipLogin
    Scenario: I want to do login with incorrect user with user Jenita3
        Given I load Load Page
        When I write "jenita3" in input username
        And I write "12345" in input password
        And Click on Button Iniciar Session
        Then display message "El usuario no existe"

    @skipLogin
    Scenario: I want to do login with incorrect passwordr with user Jenita3
        Given I load Load Page
        When I write "jenita2" in input username
        And I write "123" in input password
        And Click on Button Iniciar Session
        Then display message "El password no es correcto"