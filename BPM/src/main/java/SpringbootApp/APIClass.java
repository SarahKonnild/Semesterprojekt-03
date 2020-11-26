package SpringbootApp;

import Domain.Facade;
import Interfaces.IFacade;
import org.springframework.web.bind.annotation.*;

@RestController
public class APIClass {

    public final IFacade facadeClass = Facade.getFacade() ;

    @PostMapping("/startProduction")
    public void startProd(){

    }

//    @PostMapping("/stopProduction")
//    public IFacade stopProduction();
//
//    @GetMapping("/detectMaintenanceStatus")
//    public IFacade detectMaintenanceStatus();
//
//    @GetMapping("/calculateErrorSpeed")
//    public IFacade calculateErrorSpeed();
//
//    @GetMapping("/calculateErrorMargin")
//    public IFacade calculateErrorMargin();
//
//    @GetMapping("/caclulateOptimalSpeed")
//    public IFacade caclulateOptimalSpeed();

}
