package SpringbootApp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Production{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private Batch batch;

    protected Production(){

    }

    public Production(int id, Batch batch){
        this.id = id;
        this.batch = batch;
    }

}
